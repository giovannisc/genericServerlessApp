export function extractUserSubFromEvent(event){
  return event.requestContext.identity.cognitoAuthenticationProvider.split('CognitoSignIn:')[1];
}

export function extractIdentityIdFromEvent(event){
  return event.requestContext.identity.cognitoIdentityId;
}
