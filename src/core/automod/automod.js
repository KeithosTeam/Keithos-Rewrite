async function main(message, Schema){

	return
	console.log("automod")

	const data = await Schema.findOne({ _id: message.guild.id });

	    if (!data) {
			data = new Schema({ _id: guild.id });
			data.save();
        }
    const list = data.autoModList
    let i = 0
    const test = ["nword", "bannedword"]
    while(test.length < i){
    	console.log(message.content)
    	if (message.content.toLowerCase.includes(list[i])){
    		console.log("banned word")
    	}
    	i++
	}
}

module.exports = {
	main
}