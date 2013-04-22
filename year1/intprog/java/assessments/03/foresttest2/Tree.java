/**
 * A class to represent a tree
 * 
 * @author Robert Topp
 * @version 2011.03.18
 */
public class Tree
{
    // the species of tree
    private String species;
    // the age of the tree in years
    private int age;
    // the height of the tree in metres
    private double height;
    // whether tree is evergreen or decidious
    private boolean evergreen;

    /**
     * Constructor for objects of class Tree
     */
    
    public Tree(String s, int a, double h, boolean e)
    {
        species = s;
        age = a;
        height = h;
        evergreen = e;
    }
    
    /**
     * Return the age of this tree.
     */
    public int getAge()
    {
        return age;
    }

    /**
     * Return the height of this tree.
     */
    public double getHeight()
    {
        return height;
    }
    
    /**
     * Return the species of this tree.
     */
    public String getSpecies()
    {
        return species;
    }
    
    /**
     * Return whether or not this tree is an evergreen.
     */
    public boolean getEvergreen()
    {
        return evergreen;
    }
    
    /**
     * Update the age of the tree.
     */
    public void incAge()
    {
        age = age + 1;
    }
    
    /**
     * Update the height of the tree
     */
    public void updateHeight(double x)
    {
        height = height + x;
    }
}
