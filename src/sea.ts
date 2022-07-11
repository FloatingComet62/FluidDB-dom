import fetch from "node-fetch"
import { Response } from './types'
import River from "./river"

class Sea {
    constructor(
        public name: string,
        private oceanName: string,
        private link: string,
        public data: Object
    ) {
        this.name = name
        this.link = link
        this.data = data
        this.oceanName = oceanName
    }
    async getRiver(name: string) {
        const res = await (await fetch(`${this.link}/river/${this.oceanName}/${this.name}/${name}`)).json() as Response
        if (res.success) {
            const ocean = new River(name, this.oceanName, this.name, this.link, res.message as string)
            return { success: true, data: ocean, message: "Successfully retrieved sea" }
        }
        return { success: false, data: null, message: "Failed to get sea" }
    }
    async addRiver(name: string, value: string) {
        const res = await (await fetch(`${this.link}/river/${this.oceanName}/${this.name}/${name}/${value}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) {
            const ocean = new River(name, this.oceanName, this.name, this.link, value)
            return { success: true, data: ocean, message: "Successfully added sea" }
        }
        return { success: false, data: null, message: "Failed to create sea" }
    }
    async deleteRiver(name: string) {
        const res = await (await fetch(`${this.link}/river/${this.oceanName}/${this.name}/${name}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) return { success: true, data: null, message: "Successfully deleted sea" }
        return { success: false, data: null, message: "Failed to delete sea" }
    }
}

export default Sea