package lab2;

// in the Student class
public class Student {

    private String name, id; // private instance variables - accessed only within this class
    private int[] score = new int[3]; // score[] is an array of three integers for the exam marks

    // Constructor (default)
    public Student() {
        name = "N/A";
        id = "#";
        score = new int[] {0,0,0};
    }

    // Constructor (to initialise the name, the id, and the exam marks)
    public Student(String stName, String stID, int stScore[]) {
        name = stName;
        id = stID;
        score = stScore;
    }

    // Modifier methods
    public void setName(String nameIn) { // to modify the student name
        name = nameIn;
    }

    // Access methods
    public String getName() { // to access the student name
        return name;
    }

    public String getId() { // to access the student's id
        return id;
    }

    // Calculates the average score
    public double avScore() { // calculate the total and divide it by 3
        double total = 0;

        for (int i = 0; i < score.length; i++) {
            total += score[i];
        }

        return total / score.length;
    }

    // Displays the student data attributes
    public void printOut() {
        System.out.print("Name: " + this.getName() + " | ");
        System.out.print("ID: " + this.getId() + "\n");
        System.out.print("Average score: " + this.avScore() + "\n");
    }
}