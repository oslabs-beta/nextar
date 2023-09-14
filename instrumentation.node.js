import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'

const provider = new NodeTracerProvider();

const exporter = new OTLPTraceExporter({'url': 'http://localhost:8000/postTraceData'})
const spanProcessor = new SimpleSpanProcessor(exporter); 

provider.addSpanProcessor(spanProcessor);
provider.register();
