public class Teacher extends Person
{
    private int salary;

    public Teacher(String name, int salary){
        super(name);
        this.salary = salary;
    }
    
    public int getSalary(){
        return this.salary;
    }
    
    public void setSalary(int salary){
        this.salary = salary;
    }
    
    public void display(){
        super.display();
        System.out.println("Salary: " + this.salary);
    }
}
