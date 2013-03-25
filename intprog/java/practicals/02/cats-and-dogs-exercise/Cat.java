public class Cat{

    private String name;
    private int age;
    private String colour;
    private boolean disposition;
    
    public Cat(String catName, int catAge, String catColour, boolean catDisposition){
        name = catName;
        age = catAge;
        colour = catColour;
        disposition = catDisposition;
    }
    
    public Cat(String catName){
        name = catName;
        age = 1;
        colour = "ginger";
        disposition = true;
    }
    
    public String getName(){
        return name;
    }
    
    public void setName(String catName){
        name = catName;
    }    
    
    public int getAge(){
        return age;
    }    
    
    public void setAge(int catAge){
        age = catAge;
    }
    
    public String getColour(){
        return colour;
    }
    
    public void setColour(String catColour){
        colour = catColour;
    }
    
    public boolean getDispostion(){
        return disposition;
    }
    
    public void setDisposition(boolean catDisposition){
        disposition = catDisposition;
    }
    
    public void purr(){
        System.out.println("purr purr purr");
    }
    
    public void miaow(){
        System.out.println("miaow miaow miaow");
    }
    
    public void makesound(){
        if (disposition == true){
            purr();
        }else{
            miaow();
        }
    }

}