import aws from "aws-sdk";
import xray from "aws-xray-sdk";
xray.setContextMissingStrategy("LOG_ERROR");
// Do not enable tracing for 'invoke local'
const awsWrapped = process.env.IS_LOCAL ? aws : xray.captureAWS(aws);
process.env.IS_LOCAL && aws.config.update({region: process.env.REGION});

export default awsWrapped;
