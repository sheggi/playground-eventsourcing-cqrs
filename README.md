# Playground for Event Sourcing and CQRS

## Installation

get dependencies
```
npm install
```

run each service
```
npm run transaction
npm run stream
npm run accounting
```

testing => load the insomnia.json in Insomnia


## Event Sourcing

Some basics about Event Sourcing 
- https://de.wikipedia.org/wiki/Event_Sourcing

## CQRS

Some basics about CQRS (Command-Query-Responsibility-Segregation)
- https://de.wikipedia.org/wiki/Command-Query-Responsibility-Segregation

## PoC

This is an Accounting app as PoC. Here you have three services implementing Event Sourcing and CQRS.

### Out of Scope

This PoC doesn't cover security aspect as using authentication or authorisation for each service.

### Transaction Service

The transaction service just receives request for changes on the account balance. Each request is saved as an event in the Event Store (pushes events to the Stream Service).

If you like, you can add some validation and authorisation.

### Stream Service

This service abstracts the Event Store. It's named because it works like a stream of events. On one end there are new events pushed to the stream, on the other end the stream of events is consumed by some other services.

The streaming service also persists all events in the store.json to prevent losing events when the service dies or get caught up.

The Event Store does not need to be a streaming service, it could also be a simple database.

### Accounting Service

The accounting service consumes the Event store. It evaluates each event to an account. Once the events are evaluated, the current state can received instantly.

Now to handle a great amount of requests, you just spin up an other instance of this service.

If the Transaction Service or the Stream Service should be down, the Accounting Service can still serve all request to the current state.

## Some Insights

At on point i had a bug in the Accounting Service. Luckily when I fixed the bug and restarted the service it just worked perfectly and gave the correct balance. Therefore its quite resilient against bugs.

Problems can arise if you change the event schema. Tho use version in the events.

If i want to ad some statistics about the account balance, i just create an other service consuming the same events... easy as that.

Each service is so trivial and simple