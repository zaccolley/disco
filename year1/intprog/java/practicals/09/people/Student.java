public class Student extends Person
{
    private String uni;

    /**
     * Constructor for objects of class Student
     */
    public Student(String name, String uni)
    {
       super(name);
       this.uni = uni;
    }

    public String getUni(){
        return this.uni;
    }
    
    public void setUni(String uni){
        this.uni = uni;
    }
    
    public void display(){
        super.display();
        System.out.println("Uni:" + this.uni);
    }
}
