import { Store } from "./Store.js";
import { fromBoxes } from "./objects/state.js";
export class Orm {
    _algorand;
    _manager;
    stores = new Map();
    constructor({ algorand, manager, }) {
        this._algorand = algorand;
        this._manager = manager;
    }
    /**
     * Experimental: Factory for the Lodash application.
     */
    factory = null;
    async add(appId, refs) {
        if (this.stores.has(appId)) {
            throw new Error(`Store with appId ${appId} already exists`);
        }
        const store = new Store(await fromBoxes(this._algorand, appId));
        await store
            .setAlgorand(this._algorand)
            .setManager(this._manager)
            .setAppId(appId, true);
        await store.init();
        this.stores.set(appId, refs || []);
        return store;
    }
    async create(name, initialState, refs) {
        console.log(refs);
        const store = new Store(initialState);
        store.setAlgorand(this._algorand).setManager(this._manager);
        await store.init(name);
        if (typeof store.appId === "undefined") {
            throw new Error(`Failed to initialize store with name ${name}`);
        }
        return store;
    }
}
//# sourceMappingURL=ORM.js.map