module.exports.run = async (client, message, args) => {
  message.channel.send("Tenho no momento **" + parseInt(client.ping) = "** ms de Ping")
}
module.exports.config = {
name: "ping",
aliases: ["latência"]
}
