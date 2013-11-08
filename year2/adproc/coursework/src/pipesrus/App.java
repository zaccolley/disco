package pipesrus;

import java.util.ArrayList;
import java.lang.Math;

public class App {
    
    public static void main(String[] args) {
        ArrayList<Order> orders = new ArrayList();
        
        Pipe pipe1 = new Pipe(3, 2.3, 1.0, false, false, false, 0);
        Order order1 = new Order(pipe1, 1, "now");
        
        Pipe pipe2 = new Pipe(5, 2.0, 1.0, true, true, false, 0);
        Order order2 = new Order(pipe2, 3, "now");
        
        // Type 1: Grade 1 - 3. Colours = 0. Insul = 0. Reinforce = 0.
        // Type 2: Grade 2 - 4. Colours = 1. Insul = 0. Reinforce = 0.
        // Type 3: Grade 2 - 5. Colours = 2. Insul = 0. Reinforce = 0.
        // Type 4: Grade 2 - 5. Colours = 2. Insul = 1. Reinforce = 0.
        // Type 5: Grade 2 - 5. Colours = 2. Insul = 1. Reinforce = 1.
        
        orders.add(order1);
        orders.add(order2);
        
        System.out.println("Pipe orders:\n");
        
        int pipeAmount = 0;
        
        for(Order order: orders){
            System.out.println("    + £" + order.getCost() * order.getQuantity() + " " + order);
            pipeAmount += order.getQuantity();
        }
        
        System.out.println("\nOrder amount: " + orders.size() + " ("+ pipeAmount +" pipes)");        
        totalCost(orders);
    }
    
    public static void totalCost(ArrayList<Order> orders){
        double totalCost = 0.0;
        
        for(Order order: orders){
            totalCost += order.getCost() * order.getQuantity();
        }
        
        System.out.println("Total: £" + totalCost + "\n");
    }
    
    public static void initGui(ArrayList<Order> orders){
        String title = "Pipes 'R' Us";
        
        Gui gui = new Gui(orders);
        gui.setVisible(true);
        gui.setTitle(title);
    }
    
}