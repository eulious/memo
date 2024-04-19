export const SERVER = "http://localhost:6549/";

export const invoke: { [key: string]: (...args: any[]) => Promise<any> } = new Proxy({}, {
    get(target, method: string) {
        return async (...args: any[]) => {
            console.log("in", method, args[0])
            const res = await fetch(SERVER + method, {
                method: "POST",
                mode: "cors",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...args[0] }),
            })
            const json = await res.json()
            console.log("out", json)
            return await json
        }
    }
})

export function throttle(func: Function, limit: number): Function {
    let inThrottle: boolean;

    return function (this: any): any {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            inThrottle = true;
            func.apply(context, args);
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

