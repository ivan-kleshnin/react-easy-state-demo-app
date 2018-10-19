// import {observable, observe} from "@nx-js/observer-util"
import * as R from "@paqmind/ramda"
import React from "react"
import {view, store} from "react-easy-state"

let state = store({
  users: [{name: "Alice"}, {name: "Bob"}],
})

let Index = view(props => {
  console.log("@ render Index")
  return <ul>
    {state.users.map((user, i) => {
      return <li key={i}><User i={i}/></li>
    })}
  </ul>
})

let User = view(({i}) => {
  console.log(`@ render User #${i}`)
  return <pre>{JSON.stringify(state.users[i])}</pre>
})

export default Index

// @ render Index
// @ render User #0
// @ render User #1

// Experiment #1: Mutable Ops
setTimeout(_ => {
  console.log("--1--")
  state.users[0].name = "Alice+"
  state.users[1].name = "Bob+"
}, 1000)

// --1--
// @ render User #0
// @ render User #1
// = Fine

// Experiment #2: Immutable Ops
setTimeout(_ => {
  console.log("--2--")
  state.users = R.set2([0, "name"], "Alice", state.users)
  console.log("state.users:", state.users)
}, 2000)

// --2--
// state.users: [{name: "Alice}, Proxy {name: "Bob"}] so Alice is not a proxy anymore?! @_@
// @ render Index
// @ render User #0
// = Fine

// Experiment #3: Check if Immutable op did break a proxy
setTimeout(_ => {
  console.log("--3--")
  state.users[0].name = "Alice!"
}, 3000)

// --3--
// @ render User #0
// = Fine but HOW?
