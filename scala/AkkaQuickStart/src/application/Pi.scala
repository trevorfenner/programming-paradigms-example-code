package application

import java.util.concurrent.CountDownLatch

import akka.actor.{ActorSystem, Props}

object Pi extends App {
  val system = ActorSystem("actorPathApp")
  calculate(nrOfWorkers = 1, nrOfElements = 10000, nrOfMessages = 10000)
  system.shutdown

  def calculate(nrOfWorkers: Int, nrOfElements: Int, nrOfMessages: Int) {
    val latch = new CountDownLatch(1)
    val master = system.actorOf(Props(new Master(nrOfWorkers, nrOfMessages, nrOfElements, latch)))
    master ! Calculate
    latch.await()
  }
}