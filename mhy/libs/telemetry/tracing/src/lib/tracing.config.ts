import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { Resource } from '@opentelemetry/resources'
import { InstrumentationOption } from '@opentelemetry/instrumentation'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'

export function openTelemetrySDK(serviceName: string): NodeSDK {
  const instrumentations: InstrumentationOption[] = [
    new ExpressInstrumentation(),
    new HttpInstrumentation(),
    new PinoInstrumentation()
  ]

  if (serviceName !== 'apigateway') {
    instrumentations.push(new GraphQLInstrumentation())
  }

  return new NodeSDK({
    spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
    contextManager: new AsyncLocalStorageContextManager(),
    instrumentations,
    resource: Resource.default().merge(new Resource({
      'service.name': serviceName,
    }))
  })
}
