  class Tree
  include Enumerable

  attr_accessor :children, :node_name
  def initialize(name, children = [])
    @children = children
    @node_name = name
  end

  def each(&block)
    block.call self
    children.each {|c| c.each &block}
  end

  def <=>(t)
    return nil
  end

end

t = Tree.new("root",[
  Tree.new("Left"), Tree.new("Right")
])

t.each {|node| puts node.node_name}

t.sort

class Another_Tree < Tree
  attr_accessor :colour

  def initialize(name, colour, children = [])
    super(name, children)
    @colour = colour
  end
end

a = Another_Tree.new("Odd", "Blue")

puts a.colour