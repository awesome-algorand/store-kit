import { getArc56ReturnValue } from '@algorandfoundation/algokit-utils/types/app-arc56';
import { AppClient as _AppClient, } from '@algorandfoundation/algokit-utils/types/app-client';
import { AppFactory as _AppFactory } from '@algorandfoundation/algokit-utils/types/app-factory';
export const APP_SPEC = { "arcs": [], "name": "Lodash", "structs": {}, "methods": [{ "name": "set", "args": [{ "name": "path", "type": "string" }, { "name": "value", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "get", "args": [{ "name": "path", "type": "string" }], "returns": { "type": "string" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }], "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5fX2FsZ29weV9lbnRyeXBvaW50X3dpdGhfaW5pdCgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGJ5dGVjYmxvY2sgMHg2ZjcyNmQ1ZgogICAgLy8gY29udHJhY3RzL2xvZGFzaC5weTo1CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIHR4biBOdW1BcHBBcmdzCiAgICBieiBtYWluX2JhcmVfcm91dGluZ0A3CiAgICBwdXNoYnl0ZXNzIDB4YTg2MTdjY2QgMHhjMDg1MGFlZSAvLyBtZXRob2QgInNldChzdHJpbmcsc3RyaW5nKXZvaWQiLCBtZXRob2QgImdldChzdHJpbmcpc3RyaW5nIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9zZXRfcm91dGVANSBtYWluX2dldF9yb3V0ZUA2CgptYWluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6NQogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICBwdXNoaW50IDAgLy8gMAogICAgcmV0dXJuCgptYWluX2dldF9yb3V0ZUA2OgogICAgLy8gY29udHJhY3RzL2xvZGFzaC5weToxNAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6NQogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBleHRyYWN0IDIgMAogICAgLy8gY29udHJhY3RzL2xvZGFzaC5weToxNAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBjYWxsc3ViIGdldAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgcHVzaGludCAxIC8vIDEKICAgIHJldHVybgoKbWFpbl9zZXRfcm91dGVANToKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6OQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6NQogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZXh0cmFjdCAyIDAKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6OQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBjYWxsc3ViIHNldAogICAgcHVzaGludCAxIC8vIDEKICAgIHJldHVybgoKbWFpbl9iYXJlX3JvdXRpbmdANzoKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6NQogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBibnogbWFpbl9hZnRlcl9pZl9lbHNlQDkKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIGNyZWF0aW5nCiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCgoKLy8gY29udHJhY3RzLmxvZGFzaC5Mb2Rhc2guc2V0KHBhdGg6IGJ5dGVzLCB2YWx1ZTogYnl0ZXMpIC0+IHZvaWQ6CnNldDoKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6OS0xMAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICAvLyBkZWYgc2V0KHNlbGYsIHBhdGg6IFN0cmluZywgdmFsdWU6IFN0cmluZykgLT4gTm9uZToKICAgIHByb3RvIDIgMAogICAgLy8gY29udHJhY3RzL2xvZGFzaC5weToxMQogICAgLy8gbG9nKGIiU2V0dGluZyB7cGF0aH0gdG8ge3ZhbHVlfSIpCiAgICBwdXNoYnl0ZXMgMHg1MzY1NzQ3NDY5NmU2NzIwN2I3MDYxNzQ2ODdkMjA3NDZmMjA3Yjc2NjE2Yzc1NjU3ZAogICAgbG9nCiAgICAvLyBjb250cmFjdHMvbG9kYXNoLnB5OjEyCiAgICAvLyBzZWxmLnB1YmxpY1twYXRoXSA9IHZhbHVlCiAgICBieXRlY18wIC8vIDB4NmY3MjZkNWYKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgZnJhbWVfZGlnIC0xCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5nZXQocGF0aDogYnl0ZXMpIC0+IGJ5dGVzOgpnZXQ6CiAgICAvLyBjb250cmFjdHMvbG9kYXNoLnB5OjE0LTE1CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBnZXQoc2VsZiwgcGF0aDogU3RyaW5nKSAtPiBTdHJpbmc6CiAgICBwcm90byAxIDEKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6MTYKICAgIC8vIGxvZyhiIkdldHRpbmcge3BhdGh9IHRvIHt2YWx1ZX0iKQogICAgcHVzaGJ5dGVzIDB4NDc2NTc0NzQ2OTZlNjcyMDdiNzA2MTc0Njg3ZDIwNzQ2ZjIwN2I3NjYxNmM3NTY1N2QKICAgIGxvZwogICAgLy8gY29udHJhY3RzL2xvZGFzaC5weToxNwogICAgLy8gYXNzZXJ0IHBhdGggaW4gc2VsZi5wdWJsaWMKICAgIGJ5dGVjXzAgLy8gMHg2ZjcyNmQ1ZgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQKICAgIC8vIGNvbnRyYWN0cy9sb2Rhc2gucHk6MTgKICAgIC8vIHJldHVybiBzZWxmLnB1YmxpY1twYXRoXQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYucHVibGljIGVudHJ5IGV4aXN0cwogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuY2xlYXJfc3RhdGVfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMSAvLyAxCiAgICByZXR1cm4K" }, "bareActions": { "create": ["NoOp"], "call": [] } };
class BinaryStateValue {
    value;
    constructor(value) {
        this.value = value;
    }
    asByteArray() {
        return this.value;
    }
    asString() {
        return this.value !== undefined ? Buffer.from(this.value).toString('utf-8') : undefined;
    }
}
/**
 * Exposes methods for constructing `AppClient` params objects for ABI calls to the Lodash smart contract
 */
export class LodashParamsFactory {
    /**
     * Constructs a no op call for the set(string,string)void ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static set(params) {
        return {
            ...params,
            method: 'set(string,string)void',
            args: Array.isArray(params.args) ? params.args : [params.args.path, params.args.value],
        };
    }
    /**
     * Constructs a no op call for the get(string)string ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static get(params) {
        return {
            ...params,
            method: 'get(string)string',
            args: Array.isArray(params.args) ? params.args : [params.args.path],
        };
    }
}
/**
 * A factory to create and deploy one or more instance of the Lodash smart contract and to create one or more app clients to interact with those (or other) app instances
 */
export class LodashFactory {
    /**
     * The underlying `AppFactory` for when you want to have more flexibility
     */
    appFactory;
    /**
     * Creates a new instance of `LodashFactory`
     *
     * @param params The parameters to initialise the app factory with
     */
    constructor(params) {
        this.appFactory = new _AppFactory({
            ...params,
            appSpec: APP_SPEC,
        });
    }
    /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
    get appName() {
        return this.appFactory.appName;
    }
    /** The ARC-56 app spec being used */
    get appSpec() {
        return APP_SPEC;
    }
    /** A reference to the underlying `AlgorandClient` this app factory is using. */
    get algorand() {
        return this.appFactory.algorand;
    }
    /**
     * Returns a new `AppClient` client for an app instance of the given ID.
     *
     * Automatically populates appName, defaultSender and source maps from the factory
     * if not specified in the params.
     * @param params The parameters to create the app client
     * @returns The `AppClient`
     */
    getAppClientById(params) {
        return new LodashClient(this.appFactory.getAppClientById(params));
    }
    /**
     * Returns a new `AppClient` client, resolving the app by creator address and name
     * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
     *
     * Automatically populates appName, defaultSender and source maps from the factory
     * if not specified in the params.
     * @param params The parameters to create the app client
     * @returns The `AppClient`
     */
    async getAppClientByCreatorAndName(params) {
        return new LodashClient(await this.appFactory.getAppClientByCreatorAndName(params));
    }
    /**
     * Idempotently deploys the Lodash smart contract.
     *
     * @param params The arguments for the contract calls and any additional parameters for the call
     * @returns The deployment result
     */
    async deploy(params = {}) {
        const result = await this.appFactory.deploy({
            ...params,
        });
        return { result: result.result, appClient: new LodashClient(result.appClient) };
    }
    /**
     * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
     */
    params = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The params for a create call
             */
            bare: (params) => {
                return this.appFactory.params.bare.create(params);
            },
        },
    };
    /**
     * Create transactions for the current app
     */
    createTransaction = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The transaction for a create call
             */
            bare: (params) => {
                return this.appFactory.createTransaction.bare.create(params);
            },
        },
    };
    /**
     * Send calls to the current app
     */
    send = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The create result
             */
            bare: async (params) => {
                const result = await this.appFactory.send.bare.create(params);
                return { result: result.result, appClient: new LodashClient(result.appClient) };
            },
        },
    };
}
/**
 * A client to make calls to the Lodash smart contract
 */
export class LodashClient {
    /**
     * The underlying `AppClient` for when you want to have more flexibility
     */
    appClient;
    constructor(appClientOrParams) {
        this.appClient = appClientOrParams instanceof _AppClient ? appClientOrParams : new _AppClient({
            ...appClientOrParams,
            appSpec: APP_SPEC,
        });
    }
    /**
     * Checks for decode errors on the given return value and maps the return value to the return type for the given method
     * @returns The typed return value or undefined if there was no value
     */
    decodeReturnValue(method, returnValue) {
        return returnValue !== undefined ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : undefined;
    }
    /**
     * Returns a new `LodashClient` client, resolving the app by creator address and name
     * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
     * @param params The parameters to create the app client
     */
    static async fromCreatorAndName(params) {
        return new LodashClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
    }
    /**
     * Returns an `LodashClient` instance for the current network based on
     * pre-determined network-specific app IDs specified in the ARC-56 app spec.
     *
     * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
     * @param params The parameters to create the app client
     */
    static async fromNetwork(params) {
        return new LodashClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
    }
    /** The ID of the app instance this client is linked to. */
    get appId() {
        return this.appClient.appId;
    }
    /** The app address of the app instance this client is linked to. */
    get appAddress() {
        return this.appClient.appAddress;
    }
    /** The name of the app. */
    get appName() {
        return this.appClient.appName;
    }
    /** The ARC-56 app spec being used */
    get appSpec() {
        return this.appClient.appSpec;
    }
    /** A reference to the underlying `AlgorandClient` this app client is using. */
    get algorand() {
        return this.appClient.algorand;
    }
    /**
     * Get parameters to create transactions for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
     */
    params = {
        /**
         * Makes a clear_state call to an existing instance of the Lodash smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.params.bare.clearState(params);
        },
        /**
         * Makes a call to the Lodash smart contract using the `set(string,string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        set: (params) => {
            return this.appClient.params.call(LodashParamsFactory.set(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `get(string)string` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        get: (params) => {
            return this.appClient.params.call(LodashParamsFactory.get(params));
        },
    };
    /**
     * Create transactions for the current app
     */
    createTransaction = {
        /**
         * Makes a clear_state call to an existing instance of the Lodash smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.createTransaction.bare.clearState(params);
        },
        /**
         * Makes a call to the Lodash smart contract using the `set(string,string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        set: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.set(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `get(string)string` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        get: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.get(params));
        },
    };
    /**
     * Send calls to the current app
     */
    send = {
        /**
         * Makes a clear_state call to an existing instance of the Lodash smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.send.bare.clearState(params);
        },
        /**
         * Makes a call to the Lodash smart contract using the `set(string,string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        set: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.set(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the Lodash smart contract using the `get(string)string` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        get: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.get(params));
            return { ...result, return: result.return };
        },
    };
    /**
     * Clone this app client with different params
     *
     * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
     * @returns A new app client with the altered params
     */
    clone(params) {
        return new LodashClient(this.appClient.clone(params));
    }
    /**
     * Methods to access state for the current Lodash app
     */
    state = {};
    newGroup() {
        const client = this;
        const composer = this.algorand.newGroup();
        let promiseChain = Promise.resolve();
        const resultMappers = [];
        return {
            /**
             * Add a set(string,string)void method call against the Lodash contract
             */
            set(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.set(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a get(string)string method call against the Lodash contract
             */
            get(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.get(params)));
                resultMappers.push((v) => client.decodeReturnValue('get(string)string', v));
                return this;
            },
            /**
             * Add a clear state call to the Lodash contract
             */
            clearState(params) {
                promiseChain = promiseChain.then(() => composer.addAppCall(client.params.clearState(params)));
                return this;
            },
            addTransaction(txn, signer) {
                promiseChain = promiseChain.then(() => composer.addTransaction(txn, signer));
                return this;
            },
            async composer() {
                await promiseChain;
                return composer;
            },
            async simulate(options) {
                await promiseChain;
                const result = await (!options ? composer.simulate() : composer.simulate(options));
                return {
                    ...result,
                    returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i](val) : val.returnValue)
                };
            },
            async send(params) {
                await promiseChain;
                const result = await composer.send(params);
                return {
                    ...result,
                    returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i](val) : val.returnValue)
                };
            }
        };
    }
}
//# sourceMappingURL=Lodash.js.map