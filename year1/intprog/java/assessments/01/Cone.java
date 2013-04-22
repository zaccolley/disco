public class Cone{

    private int radius;
    private int height;
    private String colour;
    private boolean containsIceCream;
    
    private double volume;
    
    public Cone(){    
        radius = 10;
        height = 60;
        colour = "Green";
        containsIceCream = true;    
    }
    
    public Cone(int coneRadius, int coneHeight, String coneColour, boolean coneContainsIceCream){
        radius = coneRadius;
        height = coneHeight;
        colour = coneColour;
        containsIceCream = coneContainsIceCream;
    }
    
    public int getRadius(){
        return radius;
    }

    public int getHeight(){
        return height;
    }
    
    public String getColour(){
        return colour;
    }
    
    public boolean getContainsIceCream(){
        return containsIceCream;
    }
    
    public double size(){
        volume = 3.141 * radius * radius * height * 0.33;
        return volume;
    }
}