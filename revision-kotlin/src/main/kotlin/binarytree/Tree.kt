package binarytree

/**
 * An ADT for a binary search tree.
 * Note that this data type is neither immutable nor thread safe.
 */
class Tree(
    var key: Int,
    var left: Tree? = null,
    var right: Tree? = null) {

    /**
     * Return a node with given value. If no such node exists, return null.
     * @param value
     */
    fun find(value: Int): Tree? = when {
        this.key > value -> left?.find(value)
        this.key < value -> right?.find(value)
        else -> this

    }

    /**
     * Insert a given value into the tree.
     * After insertion, the tree should contain a node with the given value.
     * If the tree already contains the given value, nothing is performed.
     * @param value
     */
    fun insert(value: Int) {
        if (value > this.key) {
            if (this.right == null) {
                this.right = Tree(value)
            } else {
                this.right?.insert(value)
            }
        } else if (value < this.key) {
            if (this.left == null) {
                this.left = Tree(value)
            } else {
                this.left?.insert(value)
            }
        }
    }

    /**
     * Delete the value from the given tree. If the tree does not contain the value, the tree remains unchanged.
     * @param value
     */
    fun delete(value: Int) {
        when {
            value > key -> scan(value, this.right, this)
            value < key -> scan(value, this.left, this)
            else -> removeNode(this, null)
        }
    }

    /**
     * Scan the tree in the search of the given value.
     * @param value
     * @param tree sub-tree that potentially might contain the sought value
     * @param parent node's parent
     */
    private fun scan(value: Int, tree: Tree?, parent: Tree?) {
        if (tree == null) {
            System.out.println("value " + value
                    + " seems not present in the tree.")
            return
        }
        when {
            value > tree.key -> scan(value, tree.right, tree)
            value < tree.key -> scan(value, tree.left, tree)
            value == tree.key -> removeNode(tree, parent)
        }

    }

    /**
     * Remove the node.
     *
     * Removal process depends on how many children the node has.
     *
     * @param tree node that is to be removed
     * @param parent parent of the node to be removed
     */
    private fun removeNode(tree: Tree, parent: Tree?) {
        tree.left?.let { leftChild ->
            run {
                tree.right?.let {
                    removeTwoChildNode(tree)
                } ?: removeSingleChildNode(tree, leftChild)
            }
        } ?: run {
            tree.right?.let { rightChild -> removeSingleChildNode(tree, rightChild) } ?: removeNoChildNode(tree, parent)
        }


    }

    /**
     * Remove the node without children.
     * @param tree
     * @param parent
     */
    private fun removeNoChildNode(tree: Tree, parent: Tree?) {
        parent?.let { p ->
            if (tree == p.left) {
                p.left = null
            } else if (tree == p.right) {
                p.right = null
            }
        } ?: throw IllegalStateException(
            "Can not remove the root node without child nodes")

    }

    /**
     * Remove a node that has two children.
     *
     * The process of elimination is to find the biggest key in the left sub-tree and replace the key of the
     * node that is to be deleted with that key.
     */
    private fun removeTwoChildNode(tree: Tree) {
        val leftChild = tree.left!!
        leftChild.right?.let {
            val maxParent = findParentOfMaxChild(leftChild)
            maxParent.right?.let {
                tree.key = it.key
                maxParent.right = null
            } ?: throw IllegalStateException("Node with max child must have the right child!")

        } ?: run {
            tree.key = leftChild.key
            tree.left = leftChild.left
        }

    }

    /**
     * Return a node whose right child contains the biggest value in the given sub-tree.
     * Assume that the node n has a non-null right child.
     *
     * @param n
     */
    private fun findParentOfMaxChild(n: Tree): Tree {
        return n.right?.let { r -> r.right?.let { findParentOfMaxChild(r) } ?: n }
            ?: throw IllegalArgumentException("Right child must be non-null")

    }

    /**
     * Remove a parent that has only one child.
     * Removal is effectively is just coping the data from the child parent to the parent parent.
     * @param parent Node to be deleted. Assume that it has just one child
     * @param child Assume it is a child of the parent
     */
    private fun removeSingleChildNode(parent: Tree, child: Tree) {
        parent.key = child.key
        parent.left = child.left
        parent.right = child.right
    }

    fun visit(): Array<Int> {
        val a = left?.visit() ?: emptyArray()
        val b = right?.visit() ?: emptyArray()
        return a + arrayOf(key) + b
    }
}