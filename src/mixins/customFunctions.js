export default {
    data: () => ({
        input: "",
        textareaMsg: "Let's chat",
        next: 0
    }),
    methods:{
        scrollToBottom(){
            let chatScreen = this.$el.querySelector("#chatScreen");
            chatScreen.scrollTop = chatScreen.scrollHeight - chatScreen.clientHeight;
            //console.log("Scroll height", chatScreen.scrollHeight);
            //console.log("Scroll top", chatScreen.scrollTop);
            //console.log("Client height", chatScreen.clientHeight);
            chatScreen.scrollTo(0, chatScreen.scrollHeight);
          },
          modifyTextareaMsg(){
            this.input = ""
            this.textareaMsg = "Send Message"
          },
          showNext(){
            this.next += 1
          }
    }

}