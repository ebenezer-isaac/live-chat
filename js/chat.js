class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection("chats");
        this.unsub;
    }

    async addChat(message) {
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        return await this.chats.add(chat);
    }

    getChats(callback) {
        this.unsub = this.chats.where("room", "==", this.room).orderBy("created_at").onSnapshot(snapshot => {
            snapshot.docChanges().forEach(data => {
                if (data.type === "added") {
                    callback(data.doc.data());
                }
            })
        })
    }

    updateName(username) {
        this.username = username;
        localStorage.username = username;
    }

    updateRoom(room) {
        this.room = room;
        localStorage.room = room;
        if (this.unsub) {
            this.unsub();
        }
    }
}

