import { NodeSDK } from '@opentelemetry/sdk-node'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { Resource } from '@opentelemetry/resources'
import { InstrumentationOption } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'

export function openTelemetrySDK(serviceName: string): NodeSDK {
  const instrumentations: InstrumentationOption[] = [
    new HttpInstrumentation(),
    new PinoInstrumentation()
  ]

  if (serviceName !== 'apigateway') {
    instrumentations.push(new GraphQLInstrumentation())
  }

  return new NodeSDK({
    spanProcessor: new BatchSpanProcessor(new JaegerExporter({
      endpoint: "http://localhost:14268/api/traces"
    })),
    contextManager: new AsyncLocalStorageContextManager(),
    instrumentations,
    resource: Resource.default().merge(new Resource({
      'service.name': serviceName,
    }))
  })
}
