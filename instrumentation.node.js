import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'

import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { MongooseInstrumentation } from '@opentelemetry/instrumentation-mongoose'
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-mongoose'


registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new MongooseInstrumentation(),
    new PgInstrumentation(),
    new GraphQLInstrumentation(),
  ],
});

const exporter = new OTLPTraceExporter({'url': 'http://localhost:8000/postTraceData'})
const resource = new Resource({[SemanticResourceAttributes.SERVICE_NAME]: 'nextjs-app'});
const spanProcessor = new SimpleSpanProcessor(exporter); 

const sdk = new NodeSDK({
  resource: resource,
  spanProcessor: spanProcessor
})

sdk.start()