<template>
  <main>
    <div>
      <ul
        id="chatScreen"
        :style="chatScreenStyle"
      >
        <li
          v-for="(message, index) in messages.slice(0, next)"
          v-bind:key="index"
          :class="message.owner"
        >
          {{ message.text }}
        </li>
      </ul>
    </div>
    <div class="input-area">
      <textarea 
        :placeholder="textareaMsg" 
        @keyup.enter="sendWithEnter" 
        v-model.trim="input"></textarea>
      <button
        :style="sendBtnStyle"
        @click="send"
        :disabled="isDisabled"
      >
        Send Message
      </button>
    </div>
  </main>
</template>

<script>
//import axios from 'axios'
export default {
  name: "App",
  components: {},
  data: () => ({
    name: "",
    age: 0,
    location: "",
    feeling: "",
    hobby: "",
    next: 0,
    input: "",
    toChat: [],
    textareaMsg: "Let's chat",
    isDisabled: true,
    chatScreenStyle: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      overflowY: 'scroll',
      height: '80vh',
      paddingBottom: '0px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 0,
    },
    sendBtnStyle:{
      width: '150px',
      height: '50px',
      cursor: 'pointer',
      backgroundColor: '#56c8d8',
      outline: 'none',
      border: 'none',
      fontSize: '16px',
    },
    messages: [
      {
        text: "Hi, I'm Peter!",
        owner: "him",
      },
      {
        text: "What's your name?",
        ask: "name",
        owner: "him",
      },
      {
        text: "Nice to meet you!",
        owner: "him",
      },
      {
        text: "How was your day?",
        ask: "feeling",
        owner: "him",
      },
      {
        text: "Where're you from?",
        ask: "location",
        owner: "him",
      },
      {
        text: "Nice!",
        owner: "him",
      },
      {
        text: "How old are you?",
        ask: "age",
        owner: "him",
      },
      {
        text: "What's your favorite hobby?",
        ask: "hobby",
        owner: "him",
      },
      {
        text: "Wow, cool",
      },
    ],
  }),
  computed:{
    messagingFlag(){
      return this.messages.length !== this.next
    }
  },
  watch:{
    input:{
      handler(val){
        if(val.length > 0 && this.messagingFlag){
          this.isDisabled = false
        }else{
          this.isDisabled = true
        }
      },
      immediate:true
    }
  },
  methods: {
    sendWithEnter(){
      if(this.input.replace(/\r?\n|\r/g, "").length > 0 && this.messagingFlag){
        this.send()
      }else{
        //clearing input value
        this.input = ""
      }
    },
    send(){
      this.scrollToBottom()
      this.messages.splice(this.next, 0, {
        text: this.input,
        owner: "me",
      });
      
      while(this.messages[this.next]?.owner && this.messages[this.next]?.ask === undefined){
        this.next += 1;
      }
      //delay for bot typing
      setTimeout(()=>{this.next += 1},500) 
      this.modifyTextareaMsg()
      this.scrollToBottom()
      
    },

    modifyTextareaMsg(){
      this.input = ""
      this.textareaMsg = "Send Message"
    },
    scrollToBottom(){
      let chatScreen = this.$el.querySelector("#chatScreen")
      chatScreen.scrollTo({
        top: 900,
        left: 0,
        behavior: 'smooth'
      });
    }
  },
  /*mounted(){
    axios.get('data.json').then((response) => {
    console.log(response.data)
})
  }*/
};
</script>

<style>
main {
  display: flex;
  flex-direction: column; 
}

ul li {
  display: inline-block;
  padding: 20px;
  border-radius: 30px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  align-self: center;
  flex-shrink: 0;
}
.him {
  background: #eee;
  align-self: flex-start;
}
.me {
  float: right;
  background: #0084ff;
  align-self: flex-end;
  color:white;
}
.him + .me {
  border-bottom-right-radius: 5px;
}
.me + .me {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.me:last-of-type {
  border-bottom-right-radius: 30px;
}
.input-area {
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 10px;
  z-index: 100;
  background: #ffffff;
  display: flex;
  align-items: flex-end;
}
textarea {
  width: 100%;
  resize: none;
  padding: 10px;
  margin-right: 24px;
  outline: none;
  height: 100px;
  font-size: 16px;
}
</style>