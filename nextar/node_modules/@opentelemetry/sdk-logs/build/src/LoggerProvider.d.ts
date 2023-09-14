import type * as logsAPI from '@opentelemetry/api-logs';
import { IResource } from '@opentelemetry/resources';
import type { LoggerProviderConfig } from './types';
import type { LogRecordProcessor } from './LogRecordProcessor';
import { Logger } from './Logger';
import { MultiLogRecordProcessor } from './MultiLogRecordProcessor';
export declare const DEFAULT_LOGGER_NAME = "unknown";
export declare class LoggerProvider implements logsAPI.LoggerProvider {
    readonly resource: IResource;
    private readonly _loggers;
    private _activeProcessor;
    private readonly _registeredLogRecordProcessors;
    private readonly _config;
    private _shutdownOnce;
    constructor(config?: LoggerProviderConfig);
    /**
     * Get a logger with the configuration of the LoggerProvider.
     */
    getLogger(name: string, version?: string, options?: logsAPI.LoggerOptions): logsAPI.Logger;
    /**
     * Adds a new {@link LogRecordProcessor} to this logger.
     * @param processor the new LogRecordProcessor to be added.
     */
    addLogRecordProcessor(processor: LogRecordProcessor): void;
    /**
     * Notifies all registered LogRecordProcessor to flush any buffered data.
     *
     * Returns a promise which is resolved when all flushes are complete.
     */
    forceFlush(): Promise<void>;
    /**
     * Flush all buffered data and shut down the LoggerProvider and all registered
     * LogRecordProcessor.
     *
     * Returns a promise which is resolved when all flushes are complete.
     */
    shutdown(): Promise<void>;
    getActiveLogRecordProcessor(): MultiLogRecordProcessor;
    getActiveLoggers(): Map<string, Logger>;
    private _shutdown;
}
//# sourceMappingURL=LoggerProvider.d.ts.map