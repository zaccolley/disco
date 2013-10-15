package lab2;

//in the Main class (to test class Student)
public class Main {    
    
    public static void main(String[] args) {
        
        Student stud1 = new Student("Ben", "UP12345", new int[] {10,10,10});
        Student stud2 = new Student("Thom", "UP56789", new int[] {10,10,10});
        Student stud3 = new Student("Zac", "UP665219", new int[] {10,10,10});
        Student stud4 = new Student("John", "UP112234", new int[] {10,10,10});
        Student stud5 = new Student("Bill", "UP657894", new int[] {10,10,10});
        
        Student stud6 = new Student("Tedd", "UP223451", new int[] {100,20,10});
        Student stud7 = new Student("Pete", "UP187644", new int[] {80,15,5});
        Student stud8 = new Student("Terry", "UP998766", new int[] {100,20,2});
        Student stud9 = new Student("Tim", "UP567443", new int[] {10,7,80});
        Student stud10 = new Student("Sam", "UP111234", new int[] {12,25,30});
        
        Course course1 = new Course(
                                "Computing",
                                new Student[] {stud1, stud2, stud3, stud4, stud5});
        
        Course course2 = new Course(
                                "Maths",
                                new Student[] {stud6, stud7, stud8, stud9, stud10});
        
        course1.printOut();
        course2.printOut();
        
    }
    
}