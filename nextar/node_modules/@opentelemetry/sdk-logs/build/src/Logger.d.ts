import type * as logsAPI from '@opentelemetry/api-logs';
import type { IResource } from '@opentelemetry/resources';
import type { InstrumentationScope } from '@opentelemetry/core';
import type { LoggerConfig, LogRecordLimits } from './types';
import { LoggerProvider } from './LoggerProvider';
import { LogRecordProcessor } from './LogRecordProcessor';
export declare class Logger implements logsAPI.Logger {
    readonly instrumentationScope: InstrumentationScope;
    private _loggerProvider;
    readonly resource: IResource;
    private readonly _loggerConfig;
    constructor(instrumentationScope: InstrumentationScope, config: LoggerConfig, _loggerProvider: LoggerProvider);
    emit(logRecord: logsAPI.LogRecord): void;
    getLogRecordLimits(): LogRecordLimits;
    getActiveLogRecordProcessor(): LogRecordProcessor;
}
//# sourceMappingURL=Logger.d.ts.map