package com.octber.shop.filter;

import com.octber.shop.entity.Admin;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns = "/admin/*", filterName = "loginFilter")
public class AdminLoginFilter implements Filter {
	private static final String LOGIN_PAGE = "/login";
    public static final String ADMIN_LOGIN = "admin";
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
        HttpSession session = req.getSession();
        Admin user = (Admin)session.getAttribute(ADMIN_LOGIN);
    	if (user == null) {
    		((HttpServletResponse)response).sendRedirect(LOGIN_PAGE);
    		return;
    	}
        chain.doFilter(request, response);
	}

	@Override
	public void destroy() {}
}