export class FuncaoConfianca {
    idFuncaoConfianca: number = 0;
    idFuncaoConfiancaIni: number = 0;
    nome: string = '';
}

export class Cargo {
    idCargo: number = 0;
    idCargoIni: number = 0;
    nome: string = '';
}

export class Orgao {
    idOrgao: number = 0;
    sigla: string = '';
    nome: string = ''
}

export class Lotacao {
    idLotacao: number = 0;
    idLotacaoIni: number = 0;
    sigla: string = '';
    nome: string = '';
    orgao = new Orgao();
}

export class Pessoa {
    idPessoaIni: number = 0;
    sigla: string = '';
    nome: string = '';
    email: string = '';
    funcaoConfianca = new FuncaoConfianca();
    lotacao = new Lotacao();
    cargo = new Cargo();
}

export class DocumentoAssinado {
    sigla!: string;
    status!: string;
}

export class Documento {
    id!: number;
    sigla!: string;
    id_catalogo!: number;
    siglamobilpai!: string;
    tipo_aquisicao!: string;
    meusTextosPadrao!: string;
    responsavelAssinatura!: string;
    substituto!: boolean;
    interessado!: string;
    cadastrante!: string;
    assunto!: string;
    numReferencia!: string;
    textoMemorando!: string;
    dataCriacao!: Date;
    dataAssinatura!: Date;
    modelo!: string;
}

export class DocumentoSecc {
    sigla!: string;
    entrevista!: string;
	conteudoBlobHtmlString!: string;
    interessado!: string;
    assunto!: string;
    referencia!: string;
    mem!: string;
    modelo!: string;
    subscritorSigla!: string;
    subscritor!: [];
}

export class Assinatura {
    tipo!: string;
}

export class Login {
    sigla!: string;
    senha!: string;
}

export class Tipo {
    filtrar!: string;
}

export class Movimentacao {
    siglaSubscritor!: string;
    lotacao!: string;
    cargo!: string;
    dataCriacao!: Date;
    dataFinalizacao!: Date;
    tipoMovimentacao!: number;
    documento = new Documento();
}
export class Material {
    id!: number;
    idModelo!: number;
    cdMaterial!: String;
    cdItem!: number;
    txDescricaoItem!: String;
    cdNaturezaDespesa1!: number;
    cdNaturezaDespesa2!: number;
    cdNaturezaDespesa3!: number;
    cdBecStatus!: number;
    cdStatusItem!: number;
    dataAlteracao!: String;
    dataMovimento!: String;
    cdSeloVerde!: number;
    dataMaxNegociacao!: String;
    quantidade!: String;
    materialMaterial = new MaterialMaterial();
    materialItemCaracteristica = new  MaterialItemCaracteristica();
}
export class MaterialMaterial{
    cdClasse!: number;
    cdMaterial!: number;
    txMaterial!: String ;
    dataAlteracao!: String ;
    dataMovimento!: String ;
    txMotivoSeloVerde!: String ;
    cdStatusMaterial!: number;
    cdAgrupamento!: number;
    materialClasse  = new  MaterialClasse();
    
    }

export class MaterialItemCaracteristica {
    cdItem!: number;
    cdItemSeqCaracteristica!: number;
    txDescricaoCaracteristica!: String ;
    txDescricaoCaracteristicaPrefixo!: String ;
    nrObrigatorio!: number;
    nrSequenciaCaracteristica!: number;
    }
export class MaterialClasse {
    cdGrupo!: number;
    cdClasse!: number;
    dataAlteracao!: String;
    dataMovimento!: String;
    txNotaGrupo!: String;
    cdStatusClasse!: number;
    materialGrupo  = new  MaterialGrupo();
    }   
export class MaterialGrupo {

    cdGrupo!: number;
    txNomeGrupo!: String;
    dataAlteracao!: String;
    dataMovimento!: String;
    cdStatusGrupo!: number;
}
export class Servico {
    id!: number;
    cdServico!: String;
    cdItem!: number;
    txDescricaoItem!: String;
    cdBecStatus!: number;
    cdStatusItem!: number;
    dtStItem!: number;
    dataAlteracao!: String;
    dataMaxNegociacao!: String;
    quantidade!: String;
    servicoClasse = new ServicoClasse();
    servicoGrupo = new ServicoGrupo();
    servicoServico = new ServicoServico();
}

export class Catalogo {
    id!: number;
    cdServico!: String;
    cdItem!: number;
    txDescricaoItem!: String;
    cdBecStatus!: number;
    cdStatusItem!: number;
    dtStItem!: number;
    dataAlteracao!: String;
    dataMaxNegociacao!: String;
    quantidade!: String;
}

export class ServicoClasse {
    cdGrupo!: number;
    cdClasse!: number;
    txDescricaoClasses!: String;
    dtAlteracao!: number;
    txNotaClasse!: String;
    cdStatusClasse!: number;
}
export class ServicoGrupo {

    cdGrupo!: number;
    txNomeGrupo!: String ;
    dtAlteracao!: String ;
    txNotaGrupo!: String ;
    cdStatusGrupo!: number;
}
export class ServicoServico {

    cdClasse!: number;
    cdServico!: number;
    txNomeServico!: String ;
    dtAlteracao!: number;
    cdStatusServico!: number;
    cdAgrupamento!: String ;
    
}
export class TextoPadrao {
    id!: number;
    siglaPessoa!: string;
    modelo!: string;
    titulo!: string;
    interessado!: string;
    assunto!: string;
    numReferencia!: string;
    textoMemorando!: string;
}