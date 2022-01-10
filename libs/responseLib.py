import simplejson as json;

def success(body):
    return buildResponse(200, body);

def failure(body):
    return buildResponse(500, body);

def accessDenied(body):
    return buildResponse(401, body);

def successList(items, count, scannedCount):
    return buildResponse(200, {"items": items, "count": count, "scannedCount": scannedCount});

def notFound(body):
    return buildResponse(404, body);

def buildResponse(statusCode, body):
    print(body)
    return {
        "statusCode": statusCode,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        "body": json.dumps(body)
    };
