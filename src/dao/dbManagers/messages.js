import {
    messageModel
} from '../models/messages.js'


export default class Messages {
    constructor() {
        console.log('Working messages with DB');

    }
    getAll = async () => {
        const messages = await messageModel.find().lean();
        return messages;
    }

    save = async (message) => {
        const result = await messageModel.create(message);
        return result;
    }

}