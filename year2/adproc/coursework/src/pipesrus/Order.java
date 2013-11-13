package pipesrus;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Order{
    
    private Pipe pipe;
    
    private int quantity = 0;
    private double cost = 0.0;
    
    private Date dateTime = new Date();
    
    public Order(){
    }
    
    public Order(Pipe pipe, int quantity, Date dateTime){
        this.pipe = pipe;        
        
        if(quantity > 0 && quantity <= 200){            
            this.quantity = quantity; 
        }else{ System.out.println("[Pipe] Quanitity should 0-200: "+ quantity); }
        
        calcCost();
       
        this.dateTime = dateTime;
    }
    
    public double gradeCost(int grade){
        double gradeCost = 0.0;
        
        switch(grade){        
            case 1: gradeCost = 0.25; break;
            case 2: gradeCost = 0.29; break;
            case 3: gradeCost = 0.32; break;
            case 4: gradeCost = 0.37; break;
            case 5: gradeCost = 0.41; break;
        }
        
        return gradeCost;
    }
    
    public double extraCost(Pipe pipe, double cost){
        double percent = 1.0;
        
        if(pipe.getChemRes()){ percent += 0.10; }
        if(pipe.getColours() > 0){            
            if(pipe.getColours() == 1){ percent += 0.13; }
            if(pipe.getColours() == 2){ percent += 0.16; }        
        }        
        if(pipe.getInsul()){ percent += 0.12; }
        if(pipe.getReinforce()){ percent += 0.13; }
        
        return cost * percent;
    }

    
    public void calcCost(){
        double volume = pipe.getLengthIn() * pipe.getXAreaIn();
        System.out.println("[Order] Volume: " + volume);
        double calcCost = volume * gradeCost(pipe.getGrade());
        calcCost = extraCost(pipe, calcCost);
        
        setCost((double) Math.round(calcCost * 100) / 100);
    }
    
    // getters
    
    public Pipe getPipe(){
        return pipe;
    }
    
    public int getQuantity(){
        return quantity;
    }
    
    public double getCost(){
        return cost;
    }
    
    public Date getDateTime(){
        return dateTime;
    }
    
    // pretty getters
    
    public String getPrettyCost(){
        DecimalFormat formatter = new DecimalFormat("0.00");
        return "<i><font color='#333333'>(£" + formatter.format(getCost()) + " each)</font></i>";
    }
    
    public String getPrettyQuantity(){
        return "<u>" + getQuantity() + "x</u> ";
    }
    
    public String getPrettyDateTime(){
        DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
        Date dateTime = new Date();
        return "[" + dateFormat.format(dateTime) + "]";
    }
    
    // setters
    
    public void setPipe(Pipe pipe){
        this.pipe = pipe;
    }
    
    public void setCost(Double cost){
        this.cost = cost;
    }
    
    public void setQuantity(int quantity){
        this.quantity = quantity;
    }
    
    public void setDateTime(Date dateTime){
        this.dateTime = dateTime;
    }
    
    @Override
    public String toString(){
        return  getPrettyCost() + getPrettyDateTime() + " | " + getPrettyQuantity() + pipe;
    }
    
    
}
