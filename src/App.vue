<template>
  <main>
    <div>
      <ul
        :style="{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          overflowY: 'scroll',
          height: '600px',
          paddingBottom: '100px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 0,
        }"
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
      <textarea placeholder="Type your message" v-model="input"></textarea>
      <button
        :style="{
          width: '150px',
          height: '50px',
          cursor: 'pointer',
          backgroundColor: '#56c8d8',
          outline: 'none',
          border: 'none',
          fontSize: '16px',
        }"
        @click="send"
      >
        Send Message
      </button>
    </div>
  </main>
</template>

<script>
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
  methods: {
    send() {
      let active = true;
      while (active) {
        if (typeof this.messages[this.next].ask === "undefined") {
          this.next += 1;
        } else {
          this.next += 1;
          if (this.messages[this.next].ask === "name") {
            this.name = this.input;
            this.messages.splice(this.next, 0, {
              text: this.input,
              owner: "me",
            });
          }
          active = false;
        }
      }
    },
  },
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
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