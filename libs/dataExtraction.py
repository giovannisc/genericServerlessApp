def extractUserSubFromEvent(event):
    return event['requestContext']['identity']['cognitoAuthenticationProvider'].split('CognitoSignIn:')[1];

def extractIdentityIdFromEvent(event):
    return event['requestContext']['identity']['cognitoIdentityId'];
