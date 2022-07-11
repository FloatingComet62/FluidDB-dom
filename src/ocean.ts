import fetch from "node-fetch"
import Sea from "./sea"
import { Response } from './types'

class Ocean {
    constructor(
        public name: string,
        private link: string,
        public data: Object
    ) {
        this.name = name
        this.link = link
        this.data = data
    }
    async getSea(name: string) {
        const res = await (await fetch(`${this.link}/sea/${this.name}/${name}`)).json() as Response
        if (res.success) {
            const ocean = new Sea(name, this.name, this.link, res.message)
            return { success: true, data: ocean, message: "Successfully retrieved sea" }
        }
        return { success: false, data: null, message: "Failed to get sea" }
    }
    async addSea(name: string) {
        const res = await (await fetch(`${this.link}/sea/${this.name}/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) {
            const ocean = new Sea(name, this.name, this.link, res.message)
            return { success: true, data: ocean, message: "Successfully added sea" }
        }
        return { success: false, data: null, message: "Failed to create sea" }
    }
    async deleteSea(name: string) {
        const res = await (await fetch(`${this.link}/sea/${this.name}/${name}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) return { success: true, data: null, message: "Successfully deleted sea" }
        return { success: false, data: null, message: "Failed to delete sea" }
    }
}

export default Ocean