package pipesrus;

import java.util.ArrayList;

public class App {
    
    public static void main(String[] args) {
        ArrayList<Order> orders = new ArrayList();
        
        Pipe pipe1 = new Pipe(3, 2.3, 1.0, false, false, false, 0);
        Order order1 = new Order(pipe1, 1, "now");
        
        Pipe pipe2 = new Pipe(5, 2.0, 1.0, false, false, false, 0);
        Order order2 = new Order(pipe2, 3, "now");
        
        orders.add(order1);
        orders.add(order2);
        
        totalCost(orders);
        System.out.println("Debug total: £" + ( ((2.3 * 12.3684502768) * 0.32) + ( 3 * ((2.0 * 12.3684502768) * 0.41)) ));
    }

    public static double gradeCost(int grade){
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
    
    public static double extraCost(Pipe pipe, double cost){
        double extraCost = 0.0;
        
        int percent = 0;
        
        if(pipe.getColours() > 0){
            
            if(pipe.getColours() == 1){  }
        
        }
        // 1 colour - 13%
        // 2 colours - 16%
        // Inner insulation - 12%
        // Outer reinforcement - 13%
        // Chemical resistance - 10%
        return extraCost;
    }

    
    public static double calcCost(Order order){
        Pipe pipe = order.getPipe();
        
        double volume = pipe.getLength() * pipe.getXAreaM();
        double calcCost = order.getQuantity() * volume * gradeCost(pipe.getGrade());
        
        return calcCost;
    }
    
    public static void totalCost(ArrayList<Order> orders){
        double totalCost = 0.0;
        
        for(Order order: orders){
            totalCost += calcCost(order);
        }
        
        System.out.println("Total: £" + totalCost);
    }
    
    public static void initGui(ArrayList<Order> orders){
        String title = "Pipes 'R' Us";
        
        Gui gui = new Gui(orders);
        gui.setVisible(true);
        gui.setTitle(title);
    }
    
}