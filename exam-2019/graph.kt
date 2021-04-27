data class Node(val id: Int)
data class Edge(val from: Node, val to: Node)

fun main(args: Array<String>) {
    val edges = listOf<Edge>(
        Edge(Node(0), Node(1)),
        Edge(Node(1), Node(2)),
        Edge(Node(2), Node(3)),
        Edge(Node(3), Node(4))
    )
    val nodes = setOf<Node>(Node(0), Node(1), Node(2), Node(3), Node(4))
    reachable(3, nodes, edges).forEach { println(it) }
}


fun reachable(n: Int, init: Set<Node>, edges: List<Edge>): Set<Node> = when (n) {
    0 -> init
    else ->  {
        init.forEach { println(it) }
        val next = init.flatMap { (node) ->
            edges.filter { it.from.equals(node) }.map { it.to }
        }.toSet()
        println(n)
        next.forEach { println(it) }
        reachable(n - 1, next, edges)
    }
}

fun cycles3(nodes: Set<Node>, edges: List<Edge>): Set<Node> =
    reachable(3, nodes, edges)
//nodes.filter { (node) -> reachable(3, Set(node), edges).contains(node) }