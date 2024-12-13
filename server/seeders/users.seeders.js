import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { faker, simpleFaker } from '@faker-js/faker'
export const createUser = async (numUsers) => {
    try {
        const usersPromise = []
        for (let i = 0; i < numUsers; i++) {
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                bio: faker.lorem.sentence(10),
                password: "123456789",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName()
                }
            })
            usersPromise.push(tempUser);
        }
        await Promise.all(usersPromise)
        console.log("user created", numUsers);
        process.exit(1);

    } catch (error) {
        console.error(error);
        process.exit(1)

    }
}

export const createSampleSingleChat = async (numsChat) => {
    try {
        const users = await User.find().select("_id")
        const chatPromise = []
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatPromise.push(Chat.create({
                    name: faker.lorem.word(2),
                    members: [users[i], users[j]]
                }))
            }
        }
        await Promise.all(chatPromise)
        console.log("Chat created successfully")
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}
export const createSampleGroupChat = async (numsChat) => {
    try {
        const users = await User.find().select("_id")
        const chatPromise = []
        for (let i = 0; i < numsChat; i++) {
            const numMember = simpleFaker.number.int({ min: 3, max: users.length })
            const members = []
            for (let i = 0; i < numMember; i++) {
                const randomIndex = Math.floor(Math.random() * users.length)
                const randomUser = users[randomIndex]
                if (!members.includes(randomUser))
                    members.push(randomUser)

            }
            const chat = await Chat.create({
                groupChat: true,
                name: faker.lorem.words(1),
                members,
                creator: members[0]
            })
            chatPromise.push(chat)
        }
        await Promise.all(chatPromise)
        console.log("Chats created successfully")
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
export const createSampleMessage = async (numMessages) => {
    try {
        const users = await User.find().select("_id")
        const chats = await Chat.find().select("_id")
        const messagePromise = []
        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            const randomMessage = chats[Math.floor(Math.random() * chats.length)]
            messagePromise.push(Message.create({
                chat: randomMessage, sender: randomUser, content: faker.lorem.sentence(),
            }))
        }
        await Promise.all(messagePromise)
        console.log("Message created successfully")
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
export const createSampleMessageInAGroup = async (chatId, numMessages) => {
    try {
        const users = await User.find().select("_id")
        const messagePromise = []
        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            messagePromise.push(Message.create({
                chat:chatId,
                sender:randomUser,
                content:faker.lorem.sentence()
            }))
        }
        await Promise.all(messagePromise)
        console.log("Message created successfully")
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}