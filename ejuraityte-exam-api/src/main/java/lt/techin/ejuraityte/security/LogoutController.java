//package lt.techin.ejuraityte.security;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@Controller
//public class LogoutController {
//    @GetMapping("/logout")
//    public String logout(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
//        // Invalidate the session
//        session.invalidate();
//
//        // Clear authentication-related data
//        SecurityContextHolder.clearContext();
//
//        // Redirect to the login page with a logout success message
//        return "redirect:/login?logout";
//    }
//}
