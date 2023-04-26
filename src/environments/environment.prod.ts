/*
 * Para ambiente de homologação:
 * SIGA,
 * SECC
 */

export const environment = {
 
  production: true,
  apiUrl: 'http://secc.dev.spsempapel.sp.gov.br/secc/api',
  apiSigaUrl: 'http://www.documentos.dev.spsempapel.sp.gov.br',
  tokenAmbienteSiga: 'siga-jwt-auth-d134f2ce634a',
  uiSecc: 'http://localhost:8080', 
  ambienteSecc: 'Desenvolvimento',
  tokenAllowedDomains: [ /secc.dev.sp.gov.br/ ], 
  tokenDisallowedRoutes: [/\/oauth\/jwt\/siga/, /\/autenticar/]

};
