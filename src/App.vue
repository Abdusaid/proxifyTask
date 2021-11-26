<template>
  <main>
    <div>
      <ul
        id = "chatScreen"
        :style = "chatScreenStyle"
      >
        <li
          v-for ="(message, index) in messages.slice(0, next)"
          :key = "index"
          :class = "message.owner"
          v-text = "message.text"
        > 
        </li>
      </ul>
    </div>

    <div class = "input-area">
      <textarea 
        :placeholder = "textareaMsg" 
        @keyup.enter = "sendWithEnter" 
        v-model.trim = "input">
      </textarea>
      <button
        :style = "sendBtnStyle"
        @click = "send"
        :disabled = "isDisabled"
        v-text = "sendBtnText"
      >
      </button>
    </div>

  </main>
</template>

<script>
import axios from 'axios'
import CustomFunctionsMixins from '@/mixins/customFunctions'
export default {
  name: "App",
  mixins:[CustomFunctionsMixins],
  data: () => ({
    userResponses:{
      name: "",
      age: 0,
      location: "",
      feeling: "",
      hobby: "",
    },
    isDisabled: true,
    sendBtnText: "Send Message",
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
    messages:""
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
      this.messages.splice(this.next, 0, {
        text: this.input,
        owner: "me",
      });
      
      while(this.messages[this.next]?.owner && this.messages[this.next]?.ask === undefined){
        this.showNext()
      }
      // this.showNext()

      //delay for bot typing
      setTimeout(() => {
          this.showNext()
          this.nextTick()
        }, 500) 
        
      this.modifyTextareaMsg()
      this.getUserResponse(this.next)
      this.nextTick()
    },
    nextTick(){
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    getUserResponse(response_id){
      if(response_id == 5){
        this.userResponses.name = this.messages[response_id-2].text
      }else if(response_id == 7){
        this.userResponses.feeling = this.messages[response_id-1].text
      }else if(response_id == 10){
        this.userResponses.location = this.messages[response_id-2].text
      }else if(response_id == 12){
        this.userResponses.age = this.messages[response_id-1].text
      }else if(response_id == 14){
        this.userResponses.hobby = this.messages[response_id-1].text
        
        this.messages.splice(this.messages.length, 0, {
          text: `Thank you ${this.userResponses.name} for your messages! 
                 I am very happy for you that, on your ${this.userResponses.age} years 
                 possessing ${this.userResponses.hobby} as hobby and it is exciting! \uD83D\uDE00`,
          owner: "him",
        });
        this.showNext()
      }
    }
  },
  mounted(){
    axios.get('data.json').then((response) => {
      this.messages = [...response.data.messages]
    })
  }
}


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