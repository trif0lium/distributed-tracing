import { context, trace } from '@opentelemetry/api';
import { DEFAULT_TRACER } from './tracing.constant'

export function Span(name?: string) {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const method = propertyDescriptor.value;
    // eslint-disable-next-line no-param-reassign
    propertyDescriptor.value = function PropertyDescriptor(...args: any[]) {
      const currentSpan = trace.getSpan(context.active());
      const tracer = trace.getTracer(DEFAULT_TRACER)

      return context.with(trace.setSpan(context.active(), currentSpan), () => {
        const span = tracer.startSpan(
          name || `${target.constructor.name}.${propertyKey}`,
        );
        if (method.constructor.name === 'AsyncFunction') {
          return method.apply(this, args).finally(() => {
            span.end();
          });
        }
        const result = method.apply(this, args);
        span.end();
        return result;
      });
    };
  };
}
