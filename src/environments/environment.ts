/*
 * Para ambiente de desenvolvimento:
 * SIGA,
 * SECC
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:1111/secc/api',
  apiSigaUrl: 'http://www.documentos.dev.spsempapel.sp.gov.br',
  tokenAmbienteSiga: 'siga-jwt-auth-d134f2ce634a',
  uiSecc: 'http://localhost:8080', 
  ambienteSecc: 'Desenvolvimento',
  tokenAllowedDomains: [  /localhost:1111/ ],
  tokenDisallowedRoutes: [/\/oauth\/jwt\/siga/, /\/autenticar/, /\/recupera-token\/siga\/jwt/]
};