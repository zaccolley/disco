public class PhDStudent extends Student
{
   private String thesis;
   
    public PhDStudent(String name, String uni, String thesis)
    {
        super(name, uni);
        this.thesis = thesis;
    }

    public String getThesis(){
        return this.thesis;
    }
    
    public void setThesis(){
        this.thesis = thesis;
    }
    
    public void display(){
        super.display();
        System.out.println("Thesis: " + this.thesis);
    }
}
