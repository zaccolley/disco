/**
 * Write a description of class Person here.
 * 
 * @author Zac Colley
 * @version 1
 */
public class Person
{
    private String name;    

    /**
     * Constructor for objects of class Person
     */
    public Person(String name)
    {
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
    
    public void setName(String name){
        this.name = name;
    }
    
    public void display(){
        System.out.println("Name: " + this.name);
    }
}
