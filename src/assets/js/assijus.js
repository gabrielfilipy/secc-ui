
	function continuarComCertDig() {
		
		let codigo = localStorage.getItem('sigla-documento');
		
		$.ajaxSetup({ 
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
		
		$.ajax({
			type:'POST',
			url: localStorage.getItem('secc-url') + "/assinador/" + codigo + "/hash",
			headers: {"Authorization": localStorage.getItem('token-jwt-siga')},
			async: false,
			success:function(data) {
				console.log("Gerar Hash")
				var hash = { 
					sha1: data.sha1,
					sha256: data.sha256
				};
				continuarComCertDigAssjus(codigo, hash);
			},
			error: function() { 
				alert("Erro ao Assinar!");
			}
		});
	}
	
	function continuarComCertDigAssjus(codigo, hash) {
		console.log("Produzir assinatura digital")
		$("#loading_certificado").hide();
		
		produzirAssinaturaDigital({
			ui: 'bootstrap-3',
			iframePopupUrl: 'https://assijus.desenvolvimento.spsempapel.sp.gov.br/assijus/popup.html', 
			docs: [
				{ id: codigo, code: codigo }
			],
			beginCallback: function() {
				console.log("beginCallback");
				// código de inicialização (opcional)
			},
			hashCallback: function(id, cont) {
				console.log("hashCallback");
				// retorna o hashes sha1 e sha256 de um documento a partir da id
				console.log(hash);
				cont(hash);
			},
			// grava a assinatura recebida no parâmetro sign.envelope
			saveCallback: function(id, sign, cont) {
				console.log("saveCallback");
				var errormsg = this.errormsg;
				$.ajaxSetup({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					}
				});
		
				$.ajax({
					type:'POST',
					url: localStorage.getItem('secc-url') + "/assinador/" + id + "/sign", 
					headers: {"Authorization": localStorage.getItem('token-jwt-siga')},
					contentType: "application/json; charset=utf-8", 
					data: JSON.stringify(sign),
					success:function(data) {
						localStorage.removeItem('sigla-documento');
						localStorage.removeItem('secc-url');
						console.log('Resposta do siga após assinar: ' + data); 
						alert('Documento assinado!');
						window.location.replace(localStorage.getItem('secc-url')+"/mesa");
						$( "#ass_certdig" ).submit();
					},
					error : function(xhr) {
						alert('Erro ao mandar assinatura ao siga!');
						console.log(xhr);
						errormsg.push(id + " - Erro na gravação da assinatura: " + xhr.responseJSON.errormsg);
						cont({});
					}
				});
				// grava a assinatura recebida no parâmetro sign.envelope       
				cont({success: true});
				//cont(ass);
			},
			errorCallback: function(id, err, cont) {
				// apresenta mensagem de erro
				console.log("errorCallback");
				console.log(err);
				cont();
			},
			endCallback: function() {
				console.log("endCallback");
				gAssinando = false;
				if (this.errormsg.length > 0)
					window.alert(this.errormsg.join(', ')); 
			}
		});
	
}

