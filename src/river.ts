import fetch from "node-fetch"
import { Response } from './types'

class River {
    constructor(
        public name: string,
        private oceanName: string,
        private seaName: string,
        private link: string,
        public value: string
    ) {
        this.name = name
        this.oceanName = oceanName
        this.seaName = seaName
        this.link = link
        this.value = value
    }
    async changeValue(value: string) {
        const res = await (await fetch(`${this.link}/river/${this.oceanName}/${this.seaName}/${this.name}/${value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) return { success: true, data: null, message: "Successfully changed value" }
        return { success: false, data: null, message: "Failed to change value" }
    }
}

export default River