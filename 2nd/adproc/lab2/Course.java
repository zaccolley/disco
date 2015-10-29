package lab2;

/**
 *
 * @author up665219
 */
public class Course {
    
    private String name ;
    private Student[] students;
    private int studentAmount;
    
    public Course(){}
    
    public Course(String coName, Student coStudents[]){
        name = coName;
        students = coStudents;
        studentAmount = coStudents.length;
    }
    
    // getters
    
    public String getName(){
        return name;
    }
    
    public Student[] getStudents(){
        return students;
    }
    
    public int getStudentAmount(){
        return studentAmount;
    }
    
    // setters
    
    public void setName(String coName){
        name = coName;
    }
    
    public void setStudents(Student[] coStudents){
        students = coStudents;
        studentAmount = coStudents.length;
    }
    
    // other methods
    
    public double overallAverage(){
        double total = 0.0;
        
        for(int i = 0; i < students.length; i++){
            total += students[i].avScore();            
        }
        
        return total / students.length;
        
    }
    
    public void printOut(){
        System.out.println("-----");
        
        
        System.out.println("Course: "+ getName());        
        System.out.println("Number of students: "+ getStudentAmount());
        System.out.println("Average score:"+ overallAverage());        
        System.out.print("Names: ");
        
        for(int i = 0; i < students.length; i++){
             System.out.print(students[i].getName());
             if(i != students.length - 1){
                 System.out.print(", ");
             }else{
                 System.out.println(".");
             }
        }
        
        System.out.println("-----");
        
        System.out.println("Average score of "+ getName() +": "+ overallAverage());
    }
    
}
