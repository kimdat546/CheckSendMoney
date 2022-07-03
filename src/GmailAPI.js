var axios = require("axios");
var qs = require("qs");

class GmailAPI {
    accessToken = "";
    constructor() {
        this.accessToken = this.getAcceToken();
    }

    getAcceToken = async () => {
        var data = qs.stringify({
            client_id:
                "594080726076-7gib0k3jksn19n5i7bh71f3jall1u7fc.apps.googleusercontent.com",
            client_secret: "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",
            refresh_token:
                "1//0emMg60YA2InGCgYIARAAGA4SNwF-L9IrCASAJw9aoR_1csV1TStI3iJGSKXUEwIja__df6qtKOTonG795mRUuzQxJ2D9vmLLOjE",
            grant_type: "refresh_token",
        });
        var config = {
            method: "post",
            url: "https://accounts.google.com/o/oauth2/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };

        let accessToken = "";

        await axios(config)
            .then(async function (response) {
                accessToken = await response.data.access_token;
            })
            .catch(function (error) {
                console.log(error);
            });

        return accessToken;
    };

    searchGmail = async (searchItem) => {
        var config1 = {
            method: "get",
            url:
                "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
            headers: {
                Authorization: `Bearer ${await this.accessToken}`,
            },
            maxResults: 1
        };
        var threadId = "";

        await axios(config1)
            .then(async function (response) {
                threadId = await response.data["messages"][0].id;

                console.log("ThreadId = " + threadId);
            })
            .catch(function (error) {
                console.log(error);
            });

        return threadId;
    };

    readGmailContent = async (messageId) => {
        var config = {
            method: "get",
            url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
            headers: {
                Authorization: `Bearer ${await this.accessToken}`,
            },
            format: "minimal",
            maxResults: 1
        };


        var data = {};

        await axios(config)
            .then(async function (response) {
                data = await response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        return data;
    };


    //transid Check chuyển tiền
    readInboxContent = async (transid) => {
        const threadId = await this.searchGmail("from:no-reply@cake.vn");
        const message = await this.readGmailContent(threadId);

        const encodedMessage = await message.payload.body.data;

        const decodedStr = Buffer.from(encodedMessage, "base64").toString("ascii");

        return decodedStr.includes(transid);
    };
}

module.exports = new GmailAPI();
