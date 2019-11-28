package actor

import akka.actor.{Actor, ActorSystem, Props}
import akka.routing.{Broadcast, RoundRobinPool}

object RouterApp extends App {
  val system = ActorSystem("routerApp")
  val router = system.actorOf(RoundRobinPool(10).props(Props[RouterWorkerActor]), "workers")
  router ! Broadcast("Hello")
}

class RouterWorkerActor extends Actor {
  def receive = {
    case msg => println(s"Message: $msg received in ${self.path}")
  }
}