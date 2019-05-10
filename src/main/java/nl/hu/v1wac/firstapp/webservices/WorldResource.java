package nl.hu.v1wac.firstapp.webservices;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import nl.hu.v1wac.firstapp.model.Country;
import nl.hu.v1wac.firstapp.model.ServiceProvider;
import nl.hu.v1wac.firstapp.model.WorldService;

@Path("/countries")
public class WorldResource {

  @GET
  @Produces("application/json")
  public String getOrders() {
	WorldService service = ServiceProvider.getWorldService();
    JsonArrayBuilder jab = Json.createArrayBuilder();

    for (Country o : service.getWorldService()) {
      JsonObjectBuilder job = Json.createObjectBuilder();
      job.add(code, value)
      job.add(iso, value)

      jab.add(job);
    }

    JsonArray array = jab.build();
    return array.toString();
  }
}
